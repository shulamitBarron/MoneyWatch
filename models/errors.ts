export const autonticationError = () => ({
    errorCode: 401 ,
    message: "Authontication failed."
});

export const parameterRequaire = (paramName) => ({
    errorCode: 400 ,
    message: paramName + " is requaire."
});

export const InsightnotVaild = (insightId) => ({
    errorCode: 400 ,
    message: insightId + " is not valid for this bank."
});