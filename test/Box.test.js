const { expect } = require('chai');
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { accounts, contract } = require('@openzeppelin/test-environment');


const Box = contract.fromArtifact('Box');


describe('Box', function() {

    const [owner, other] = accounts;
    const value = new BN('43');

    beforeEach(async function() {
        this.box = await Box.new({ from: owner });
    });

    it('retrieve returns a value previusly stored', async function() {
        await this.box.store(value, { from: owner });

        expect((await this.box.retrieve()).toString()).to.equal('43')
        expect(await this.box.retrieve()).to.be.bignumber.equal(value);
    });

    it('store emits an event', async function() {
        const receipt = await this.box.store(value, { from: owner });

        expectEvent(receipt, 'ValueChanged', { newValue: value });
    });

    it('non owner cannot store a value', async function() {
        await expectRevert(this.box.store(value, { from: other }), 'Ownable: caller is not the owner');
    });
});
