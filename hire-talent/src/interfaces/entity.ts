// /src/interfaces/userInterface.ts
export interface User {
    id: number;
    email: string;
    name: string;
    // phone: string;
    password: string; // Ideally, this should not be exposed
    // roleId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

// export interface UserCreateObject {
//     email: string,
//     name: string,
//     phone: string,
//     password: string,
//     role: string,
//     country: string,
//     zipcode: string,
//     userType: UserType,
//     subscriptionType: SubscriptionType
// }

export interface UserCreateObject {
    email: string,
    name: string,
    phone: string,
    password: string,
    // role: string,
    country: string,
    zipcode: string,
    userType: UserType,
    // subscriptionType: SubscriptionType
}

export interface ProfileObject {
    title: string,
    currentCompany: string,
    currentSalary: Number,
    about: string,
    looking_for: string,
    skills: string,
}

export interface AddExperienceObject {
    title: string,
    companyName: string,
    startDate: string,
    endDate: string,
    description: string
}

// /src/interfaces/permissionInterface.ts
export interface Permission {
    id: number;
    permissionName: string;
    resource: string;
    actionType: string;
}


// /src/interfaces/documentInterface.ts
export interface Document {
    id: number;
    title: string;
    content: string;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum SubscriptionType {
    Free = "Free",
    Professional = "Professional",
    Enterprise = "Enterprise"
}

export enum UserType {
    Freelancer = "Freelancer",
    Employer = "Employer"
}


