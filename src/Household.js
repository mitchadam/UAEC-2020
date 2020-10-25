export class Address {
    street;
    city;
    province;
    postalCode;

    constructor(street, city, province, postalCode) {
        this.street = street;
        this.city = city;
        this.province = province;
        this.postalCode = postalCode;
    }

    toString() {
        return `${this.street} ${this.city} ${this.province} ${this.postalCode}`;
    }
}

export class FamilyMember {
    firstName;
    lastName;
    phn; // Personal health number.
    hin; // Health insurance number.
    medicalConditions;
    faceId;

    constructor(firstName, lastName, phn, hin, medicalConditions, faceId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phn = phn;
        this.hin = hin;
        this.medicalConditions = medicalConditions;
        this.faceId = faceId;
    }
}

export class Household {
    address;
    familyMembers;

    constructor(address, familyMembers) {
        this.address = address;
        this.familyMembers = familyMembers;
    }
}
