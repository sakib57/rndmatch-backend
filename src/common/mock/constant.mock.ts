export enum userPreference {
  RECRUITER = 'RECRUITER',
  JOB_SEEKER = 'JOB_SEEKER',
}

export enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  SELF_EMPLOYED = 'SELF_EMPLOYED',
  INTERNSHIP = 'INTERNSHIP',
  APPRENTICESHIP = 'APPRENTICESHIP',
  FREELANCE = 'FREELANCE',
  TRAINEE = 'TRAINEE',
}

export enum SeniorityLevel {
  ENTRY = 'ENTRY',
  JUNIOR = 'JUNIOR',
  MID = 'MID',
  SENIOR = 'SENIOR',
  LEAD = 'LEAD',
  LEADERSHIP = 'LEADERSHIP',
}

export enum JobIndustry {
  INFORMATION = 'INFORMATION',
}

export enum Role {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export enum Status {
  REQUESTED = 'REQUESTED',
  INVITED = 'INVITED',
  JOINED = 'JOINED',
  ACTIVE = 'ACTIVE',
  DRAFT = 'DRAFT',
  CLOSE = 'CLOSE',
}

export enum ScreeningStatus {
  HOLD = 'HOLD',
  YETTOSCREEN = 'YETTOSCREEN',
  OFFERED = 'OFFERED',
  JOINED = 'JOINED',
}

export enum ScreeningType {
  SUBJECTIVE = 'SUBJECTIVE',
  SINGLE_SELECT = 'SINGLE_SELECT',
  MULTI_SELECT = 'MULTI_SELECT',
}

export enum MediaType {
  DOC = 'DOC',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export enum UsageType {
  PER_USER = 'PER_USER',
  PER_COMPANY = 'PER_COMPANY',
}

export enum PermissionType {
  ADMINISTRATIVE = 'ADMINISTRATIVE',
  GENERAL = 'GENERAL',
}

export enum Currency {
  INR = 'INR',
  USD = 'USD',
  CAD = 'CAD',
  BDT = 'BDT',
  EUR = 'EUR',
  GBP = 'GBP',
  AUD = 'AUD',
}

export enum PaymentStatus {
  DUE = 'DUE',
  PAID = 'PAID',
}

export enum SubscriptionName {
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  SMB = 'SMB',
  ENTERPRISE = 'ENTERPRISE',
}

export enum Continent {
  ASIA = 'Asia',
  AFRICA = 'Africa',
  ANTARCTICA = 'Antarctica',
  EUROPE = 'Europe',
  NORTH_AMERICA = 'North America',
  SOUTH_AMERICA = 'South America',
  OCEANIA = 'Oceania',
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHERS = 'Others',
}

export enum LanguageProficiency {
  ELEMENTARY = 'ELEMENTARY',
  LIMITED_WORKING = 'LIMITED_WORKING',
  PROFESSIONAL = 'PROFESSIONAL',
  FULL_PROFESSIONAL = 'FULL_PROFESSIONAL',
  NATIVE = 'NATIVE',
}

export enum Language {
  ENGLISH = 'ENGLISH',
  SPANISH = 'SPANISH',
  FRENCH = 'FRENCH',
  CATALAN = 'CATALAN',
  GERMAN = 'GERMAN',
}

export enum MobilePrefixes {
  Bangladesh = '+88',
  Canada = '+1',
  USA = '+1',
}

export enum MediaProvider {
  AWS_S3 = 'AWS_S3',
  LOCAL = 'LOCAL',
  DO_SPACE = 'DO_SPACE',
  GOOGLE_CLOUD = 'GOOGLE_CLOUD',
}

export enum SocialMedia {
  FACEBOOK = 'facebook',
  TWITTER = 'Twitter',
  INSTAGRAM = 'instagram',
  SNAPCHAT = 'snapchat',
  YOUTUBE = 'Youtube',
}

export enum RoleType {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum PositionType {
  Academic = 'Academic',
  Research = 'Research',
  OpsBusiness = 'Operations & Business',
  EngSciComp = 'Engineering & Science Computing',
  IT = 'IT Services',
  Laboratory = 'Laboratory',
  HR = 'Legal, Finance & HR',
  Facilities = 'Facilities & Infrastructure',
}

export enum PackageName {
  Basic = 'Basic',
  Plus = 'Plus',
  Premium = 'Premium',
  Unlimited = 'Unlimited',
  Pay_per_hire = 'Pay per hire',
}

export enum CacheKey {
  EMAIL_TEMPLATE_FIND_ONE = 'EMAIL_TEMPLATE_FIND_ONE',
  EMAIL_CONFIGURATION_FIND_ONE = 'EMAIL_CONFIGURATION_FIND_ONE',
  CITY_FIND_ALL = 'CITY_FIND_ALL',
  COUNTRY_FIND_ALL = 'COUNTRY_FIND_ALL',
  STATE_FIND_ALL = 'STATE_FIND_ALL',
}

export enum WorkType {
  ON_SITE = 'On-Site',
  REMOTE = 'Remote',
  HYBRID = 'Hybrid',
}

export enum EmailContentType {
  USER_REGISTRATION = 'USER_REGISTRATION',
  USER_VERIFICATION = 'USER_VERIFICATION',
  GENERATE_VERIFICATION_LINK = 'GENERATE_VERIFICATION_LINK',
  GENERATE_PASSWORD_RESET_LINK = 'GENERATE_PASSWORD_RESET_LINK',
  FORGET_PASSWORD = 'FORGET_PASSWORD',
  RESET_PASSWORD = 'RESET_PASSWORD',
  NEW_MESSAGE = 'NEW_MESSAGE',
}

export enum Ethnicity {
  WHITE = 'White',
  BLACK_AMERICAN = 'Black or African American',
  ALASKA_NATIVE = 'American Indian or Alaska Native',
  ASIAN = 'Asian',
  NATIVE_HAWAIIAN = 'Native Hawaiian or Other Pacific Islander',
}

export enum Diversity {
  Hispanic = 'Hispanic',
  WHITE_ALONE_NON_Hispanic = 'White alone, non-Hispanic',
  BLACK_OR_AFRICAN_AMERICAN_ALONE_NON_Hispanic = 'Black or African American alone, non-Hispanic',
  AMERICAN_INDIAN_AND_ALASKA_NATIVE_ALONE_NON_HISPANIC = 'American Indian and Alaska Native alone, non-Hispanic',
  ASIAN_ALONE_NON_HISPANIC = 'Asian alone, non-Hispanic',
  NATIVE_HAWAIIAN_AND_OTHER_PACIFIC_ISLANDER_ALONE_NON_HISPANIC = 'Native Hawaiian and Other Pacific Islander alone, non-Hispanic',
  SOME_OTHER_RACE_ALONE_NON_HISPANIC = 'Some Other Race alone, non-Hispanic',
  MULTIRACIAL_NON_HISPANIC = 'Multiracial, non-Hispanic',
}
