"use strict";
const Base64x64 = require('./Base64x64');

/** A replica id scheme, an immutable object.
 * see https://gritzko.gitbooks.io/swarm-the-protocol/content/replica.html */
class ReplicaIdScheme {

    /** @param {Number|String} formula - scheme formula, e.g. `"0262"`, `181`... */
    constructor (formula) {
        if ((formula).constructor===Number)
            formula = '' + formula;
        if (formula.length===3)
            formula = '0' + formula;
        if (!ReplicaIdScheme.FORMAT_RE.test(formula))
            throw new Error('invalid replica id scheme formula');
        this._formula = formula;
        this._parts = formula.match(/\d/g).map(d=>parseInt(d));
    }

    get primuses () {return this._parts[0];}
    get peers () {return this._parts[1];}
    get clients () {return this._parts[2];}
    get sessions () {return this._parts[3];}

    /** @param {Number} i */
    partLength(i) {
        return this._parts[i];
    }

    isPrimusless () {
        return this.primuses===0;
    }

    isCorrect () {
        const length = this.primuses+this.peers+this.clients+this.sessions;
        return length<=10;
    }

    toString() {
        return this._formula;
    }

    /** Next value withing a specific replica id part (e.g. next session number)
     * @param {Base64x64|String} id
     * @param {Number} p
     * @return {String} next value, `0` on overflow */
    nextPartValue (id, p) {
        let from=0, i=0;
        while (i<p)
            from += this._parts[i++];
        let till = from + this._parts[i];
        let next = new Base64x64(id).next(till);
        return next.round(from).isZero() ? next.toString() : '0';
    }

}

ReplicaIdScheme.PRIMUS = 0;
ReplicaIdScheme.PEER = 1;
ReplicaIdScheme.CLIENT = 2;
ReplicaIdScheme.SESSION = 3;

ReplicaIdScheme.FORMAT_RE = /^(\d)(\d)(\d)(\d)$/;

module.exports = ReplicaIdScheme;