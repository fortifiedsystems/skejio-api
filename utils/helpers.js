const getTotalMoniesGenerated = (req) => {
    const ticketIncome = req.body.tixSold * req.body.tixPrice;
    const total = ticketIncome
        + req.body.totalMerchSales
        + req.body.barTotal;

    req.body.totalMoniesGenerated = total;
}

const getPotentialAttendance = (req) => {
    const rb = req.body;
    rb.potentialAttendance = rb.comps + rb.tixSold;
}


const getActualAttendance = (req) => {
    const rb = req.body;
    rb.actualAttendance = rb.compsAttended + rb.paidAttendance;
}



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


module.exports = {
    getTotalMoniesGenerated,
    getPotentialAttendance,
    getActualAttendance,
    getShowGross,
    getShowNet,
}