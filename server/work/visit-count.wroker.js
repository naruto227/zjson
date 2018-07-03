const VcModel = require('../dao/models/visitCount.model');
const UsersModel = require('../dao/models/users.model');
const fn = require('funclib');
const util = require('../tools/util');

module.exports = {
    pollingVc: pollingVc,
    refreshVc: refreshVc
}

/**
 * 轮询访问量
 * ------------------------------------------------------------
 */
function pollingVc(userId, isOnInit, callback) {
    UsersModel.getUserById(userId, (err, doc) => {
        util.logErr(err);
        if (doc) {
            _setUserExpireTime(userId);
        } else if (isOnInit==='no' && /^ZJSON-[0-9A-Z]{12}$/.test(userId)) {
            UsersModel.createUser({
                'userId': userId,
                'vtTime': fn.timeStamp(),
                'isActive': true,
                'isKeepAc': true
            });
            _setUserExpireTime(userId);
        }
        VcModel.getVisitCount((err, doc) => callback(doc && doc.count || 0));
    });
}

/**
 * 刷新访问量
 * ------------------------------------------------------------
 */
function refreshVc(userId, isExpire, callback) {
    UsersModel.getUserById(userId, (err, doc) => {
        util.logErr(err);
        if (doc) {
            if (isExpire === 'yes' && doc.isKeepAc) {
                VcModel.addOneVisit((err, doc) => util.logErr(err));
            }
            callback(null);
        } else {
            VcModel.addOneVisit((err, doc) => util.logErr(err));
            userId = 'ZJSON-' + fn.rdid();
            _addUser(userId, () => callback(userId));
        }
    });
}

function _setUserExpireTime(userId) {
    fn.timeout(userId, 20000, () => {
        UsersModel.removeUser(userId, (err, doc) => util.logErr(err));
    });
}

function _addUser(userId, callback) {
    const vtTime = fn.timeStamp();
    const newUser = {
        'userId': userId,
        'vtTime': vtTime,
        'isActive': true,
        'isKeepAc': false
    };
    UsersModel.createUser(newUser, (err, doc) => {
        util.logErr(err);
        callback();
    });
    _setUserExpireTime(userId);
    fn.timeout(310000, () => {
        UsersModel.updateUser(userId, (err, doc) => util.logErr(err));
    });
}
