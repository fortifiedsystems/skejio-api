/**
 * @function getTotalMoniesGenerated()
 * @description calculate gross income of show before expenses and commissions.
 * @param {Object} req request object. 
 */
const getTotalMoniesGenerated = (req) => {
    const ticketIncome = req.body.tixSold * req.body.tixPrice;
    const total = ticketIncome
        + req.body.totalMerchSales
        + req.body.barTotal;

    req.body.totalMoniesGenerated = total;
}



/**
 * @function getPotentialAttendance()
 * @description calculates attendance number is all people who bought 
 * tickets, and all people who were on the guest list were to show up.
 * @param {Object} req request object.
 */
const getPotentialAttendance = (req) => {
    const rb = req.body;
    rb.potentialAttendance = rb.comps + rb.tixSold;
}



/**
 * @function getActualAttendence
 * @description calculates actual attendance based on what portion 
 * of comps and paid patrons actually showed up to the show.
 * @param {Object} req request object
 */
const getActualAttendance = (req) => {
    const rb = req.body;
    rb.actualAttendance = rb.compsAttended + rb.paidAttendance;
}



/**
 * @function getShowGross()
 * @description calculates total money brought in by show attendance alone.
 * @param {Object} req request object
 */
const getShowGross = (req) => {
    if (req.body.deal === 'guarantee' || req.body.deal === 'guarantee vs') {
        req.body.gross = req.body.guarantee
        req.body.amountPaidByVenue = req.body.guarantee
        return;
    } else if (req.body.deal === 'cover') {
        req.body.gross = req.body.tixSold * req.body.tixPrice;
        return;
    }

    req.body.gross = 0;
}



/**
 * @function getShowNet()
 * @description calculates the net income of the artist after
 * commissions and the venue's cut of merch sales is taken out.
 * @param {Object} req request object
 * @param {Object} artist artist document
 */
const getShowNet = (
    req,
    artist,
) => {
    req.body.venueCutOfMerch =
        req.body.totalMerchSales * req.body.venueRateOnMerch;

    req.body.venueCut = req.body.venueCutOfMerch + (req.body.totalMoniesGenerated - req.body.amountPaidByVenue) + req.body.barTotal;

    req.body.owedToAgent =
        req.body.amountPaidByVenue * artist.agentRate;

    req.body.owedToManager =
        (req.body.amountPaidByVenue +
            (req.body.totalMerchSales -
                req.body.venueCutOfMerch)) *
        artist.managerRate;

    req.body.commissions = req.body.venueCutOfMerch + req.body.owedToAgent + req.body.owedToManager;

    req.body.net = (req.body.amountPaidByVenue + req.body.totalMerchSales) - req.body.commissions
}



// ANCHOR exports
module.exports = {
    getTotalMoniesGenerated,
    getPotentialAttendance,
    getActualAttendance,
    getShowGross,
    getShowNet,
}