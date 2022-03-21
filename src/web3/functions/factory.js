import { enviornment } from "../../constants/constants";
// import { addPackageAsync } from '../../modules/createnewproject/createProjectRedux/createProject.api';

// import { createInvestmentOnChainAsync, getProjectByIdAsync, offerStatusChangeByInvestorAsync, statusChangeByProjectCreatorAsync } from "../../modules/product/productRedux/product.api";
import { launchSaleAsync } from "../web3Redux/web3.api";
import { userDispatch } from "react-redux"

function getInstance(web3) {
    return new Promise(async (resolve, reject) => {
        if (web3 && web3 != '') {

            try {
                let Instance = await new web3.eth.Contract(
                    enviornment.ERC20ABI,
                    enviornment.ERC20Address
                );

                if (Instance) {
                    resolve(Instance);
                } else {
                    reject({ error: "Issue with instance" });
                }
            } catch (error) {
                reject(error);
            }
        }
    });
};

function getBalance(ercInstance, walletAddress) {
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .balanceOf(walletAddress)
                .call({ from: walletAddress }, (err, data) => {

                    if (err) {
                        reject({ error: err });
                    } else {
                        if (data > 0) {
                            resolve(parseFloat(data / enviornment.divideValue).toFixed(2));
                        } else {
                            resolve(data)
                        }
                    }

                });
        } catch (error) {
            reject(error);
        }
    });
};

function getProjectData(ercInstance, walletAddress) {
    /* console.log("in")
    console.log({methods: ercInstance})
        return false */
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .getProjectData("0x31ca67a3fe15225d767378c4e4d08796f5e69e020796dc0b4fd9247e11ca476f")
                .call({ from: walletAddress }, (err, data) => {

                    if (err) {
                        reject({ error: err });
                    } else {
                        console.log("data1", data)
                        /*  if (data > 0) {
                             resolve(parseFloat(data / enviornment.divideValue).toFixed(2));
                         } else {
                             resolve(data)
                         } */
                    }

                });
        } catch (error) {
            reject(error);
        }
    });
};

function createProject(ercInstance, walletAddress, data) {
    console.log({ data, walletAddress })
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .createProject(data.token, data.budget)
                .send({ from: walletAddress })
                .on("receipt", function (receipt) {
                    console.log({ receipt })
                    resolve(receipt);
                })
                .on("error", function (error, receipt) {
                    reject({ error: error });
                });
        } catch (error) {
            resolve(error);
        }
    });
}

function approveProject(ercInstance, walletAddress, data) {
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .approveProject(data.projectId)
                .send({ from: walletAddress })
                .on("receipt", function (receipt) {
                    resolve(receipt);
                })
                .on("error", function (error, receipt) {
                    reject({ error: error });
                });
        } catch (error) {
            reject(error);
        }
    });
}

function addCollaborator(ercInstance, walletAddress, data) {
    console.log({ walletAddress, data })
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .addCollaborator(data.projectId, data.packageId, data.collaborator, data.mgp)
                .send({ from: walletAddress })
                .on("receipt", function (receipt) {
                    resolve(receipt);
                })
                .on("error", function (error, receipt) {
                    reject({ error: error });
                });
        } catch (error) {
            resolve(error);
        }
    });
}

function addObserver(ercInstance, walletAddress, data) {
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .addObserver(data.projectId, data.packageId, data.observers)
                .send({ from: walletAddress })
                .on("receipt", function (receipt) {
                    resolve(receipt);
                })
                .on("error", function (error, receipt) {
                    reject({ error: error });
                });
        } catch (error) {
            resolve(error);
        }
    });
}

function approveCollaborator(ercInstance, walletAddress, data) {
    console.log({ walletAddress, data })
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .approveCollaborator(data.projectId, data.packageId, data.collaborator, data.approve)
                .send({ from: walletAddress })
                .on("receipt", function (receipt) {
                    resolve(receipt);
                })
                .on("error", function (error, receipt) {
                    reject({ error: error });
                });
        } catch (error) {
            resolve(error);
        }
    });
}

function createPackage(ercInstance, walletAddress, data) {
    return new Promise(async (resolve, reject) => {
        console.log('data.projectId, data.budget, data.bonus', data.projectId, data.budget, data.bonus)
        try {
            return await ercInstance.methods
                .createPackage(data.projectId, data.budget, data.bonus)
                .send({ from: walletAddress })
                .on("receipt", function (receipt) {
                    resolve(receipt);
                })
                .on("error", function (error, receipt) {
                    reject({ error: error });
                });
        } catch (error) {
            resolve(error);
        }
    });
}

function finishPackage(ercInstance, walletAddress, data) {
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .finishPackage(data.projectId, data.packageId)
                .send({ from: walletAddress })
                .on("receipt", function (receipt) {
                    resolve(receipt);
                })
                .on("error", function (error, receipt) {
                    reject({ error: error });
                });
        } catch (error) {
            resolve(error);
        }
    });
}

function finishProject(ercInstance, walletAddress, data) {
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .finishProject(data.projectId)
                .send({ from: walletAddress })
                .on("receipt", function (receipt) {
                    resolve(receipt);
                })
                .on("error", function (error, receipt) {
                    reject({ error: error });
                });
        } catch (error) {
            reject(error);
        }
    });
}

function startProject(ercInstance, walletAddress, data) {
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .startProject(data.projectId)
                .send({ from: walletAddress })
                .on("receipt", function (receipt) {
                    resolve(receipt);
                })
                .on("error", function (error, receipt) {
                    reject({ error: error });
                });
        } catch (error) {
            resolve(error);
        }
    });
}

function getPullAmount(ercInstance, walletAddress) {
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .totalSupply()
                .call({ from: walletAddress }, (err, data) => {

                    if (err) {
                        reject({ error: err });
                    } else {
                        if (data > 0) {
                            resolve(parseFloat(data));
                        } else {
                            resolve(data)
                        }
                    }

                });
        } catch (error) {
            reject(error);
        }
    });
};

function setBonusScores(ercInstance, walletAddress, data) {
    console.log({ walletAddress, data })
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .setBonusScores(data.projectId, data.packageId, data.collaborators, data.scores)
                .send({ from: walletAddress })
                .on("receipt", function (receipt) {
                    resolve(receipt);
                })
                .on("error", function (error, receipt) {
                    reject({ error: error });
                });
        } catch (error) {
            resolve(error);
        }
    });
}

function getMgp(ercInstance, walletAddress, data) {
    console.log({ walletAddress, data })
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .getMgp(data.projectId, data.packageId)
                .send({ from: walletAddress }, (err, data) => {
                    if (err) {
                        reject({ error: err });
                    } else {
                        if (data > 0) {
                            resolve(parseFloat(data / enviornment.divideValue).toFixed(2));
                        } else {
                            resolve(data)
                        }
                    }
                });
        } catch (error) {
            reject(error);
        }
    });
};

function getBonus(ercInstance, walletAddress, data) {
    console.log({ walletAddress, data })
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .getBonus(data.projectId, data.packageId)
                .send({ from: walletAddress }, (err, data) => {
                    if (err) {
                        reject({ error: err });
                    } else {
                        if (data > 0) {
                            resolve(parseFloat(data / enviornment.divideValue).toFixed(2));
                        } else {
                            resolve(data)
                        }
                    }
                });
        } catch (error) {
            reject(error);
        }
    });
};



export const poolMethods = {
    getInstance,
    createProject,
    approveProject,
    addCollaborator,
    addObserver,
    approveCollaborator,
    createPackage,
    finishPackage,
    finishProject,
    startProject,
    getPullAmount,
    getProjectData,
    setBonusScores,
    getMgp,
    getBonus
}