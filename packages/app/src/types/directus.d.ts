/** * Generated TypeScript types for Directus Schema * Generated on: 2025-06-01T13:35:38.992Z */
export interface AffirmationCardSide {
  id: string;
  audio: string | DirectusFile;
  language: string;
  text: string;
  side: string;
  foreignKey: string | AffirmationCard;
}

export interface AffirmationCard {
  id: string;
  texts: string[] | AffirmationCardSide[];
  image: string | DirectusFile;
  handle: string;
  foreignKey: string | Affirmation;
}

export interface Affirmation {
  id: string;
  handle: string;
  packName: Record<string, unknown>;
  coverImage: string | DirectusFile;
  status: string;
  cards: string[] | AffirmationCard[];
}

export interface Content {
  id: string;
}

export interface CountWithMe {
  id: string;
  status: string;
  handle: string;
  packName: Record<string, unknown>;
  groups: string[] | CountWithMeGroup[];
}

export interface CountWithMeAnimal {
  id: string;
  image: string | DirectusFile;
  textColor: string;
  xPercent: number;
  yPercent: number;
  foreignKey: string | CountWithMeGroup;
  handle: string;
}

export interface CountWithMeCountingText {
  id: string;
  audio: string | DirectusFile;
  foreignKey: string | CountWithMeGroup;
  language: string;
  text: string;
}

export interface CountWithMeFact {
  id: string;
  audio: string | DirectusFile;
  foreignKey: string | CountWithMeGroup;
  language: string;
  text: string;
}

export interface CountWithMeGroup {
  id: string;
  instructions: string[] | CountWithMeInstruction[];
  facts: string[] | CountWithMeFact[];
  gameBackgroundImage: string | DirectusFile;
  factBackgroundImage: string | DirectusFile;
  handle: string;
  animals: string[] | CountWithMeAnimal[];
  countingVoice: string;
  countingTexts: string[] | CountWithMeCountingText[];
  foreignKey: string | CountWithMe;
}

export interface CountWithMeInstruction {
  id: string;
  language: string;
  text: string;
  audio: string | DirectusFile;
  foreignKey: string | CountWithMeGroup;
}

export interface Dnd {
  id: string;
  target: string;
  targetImage: string | DirectusFile;
  audioOnComplete: string | DirectusFile;
  foreignKey: string;
  language: string;
  instructions: string[] | DndInstruction[];
  handle: string;
  pieces: number[] | DndPiecesJunction[];
}

export interface DndInstruction {
  id: string;
  audio: string | DirectusFile;
  text: string;
  language: string;
  foreignKey: string | Dnd;
}

export interface DndPiece {
  id: string;
  text: string;
  audioOnDrag: string | DirectusFile;
  audioOnDrop: string | DirectusFile;
}

export interface DndPiecesJunction {
  id: number;
  dnd_id: string | Dnd;
  pieces_id: string | DndPiece;
}

export interface Intruder {
  id: string;
  status: string;
  handle: string;
  coverImage: string | DirectusFile;
  language: string;
  wordGroups: string[] | IntruderWord[];
  packName: Record<string, unknown>;
}

export interface IntruderWord {
  id: string;
  intruderImage: string | DirectusFile;
  intruderText: string;
  intruderAudio: string | DirectusFile;
  word1Image: string | DirectusFile;
  word1Text: string;
  word1Audio: string | DirectusFile;
  word2Image: string | DirectusFile;
  word2Text: string;
  word2Audio: string | DirectusFile;
  foreignKey: string | Intruder;
}

export interface OneRoster {
  id: string;
}

export interface OneRosterAcademicSession {
  id: string;
  sourcedId: string;
  status: string;
  dateLastModified: "datetime";
  metadata: string;
  title: string;
  startDate: "datetime";
  endDate: "datetime";
  type: string;
  schoolYear: string;
  parent: Record<string, unknown>;
  children: Record<string, unknown>;
}

export interface OneRosterClass {
  id: string;
  sourcedId: string;
  status: string;
  dateLastModified: "datetime";
  metadata: string;
  title: string;
  classCode: string;
  classType: string;
  location: string;
  grades: Record<string, unknown>;
  subjects: Record<string, unknown>;
  course: string | OneRosterCours;
  school: string | OneRosterOrg;
  terms: number[] | OneRosterClassesAcademicSession[];
  subjectCodes: Record<string, unknown>;
  periods: Record<string, unknown>;
  resources: Record<string, unknown>;
}

export interface OneRosterClassesAcademicSession {
  id: number;
  class_sourcedId: string | OneRosterClass;
  academicSession_sourcedId: string | OneRosterAcademicSession;
}

export interface OneRosterCours {
  id: string;
  sourcedId: string;
  status: string;
  dateLastModified: "datetime";
  metadata: string;
  title: string;
  schoolYear: string | OneRosterAcademicSession;
  courseCode: string;
  grades: Record<string, unknown>;
  subjects: Record<string, unknown>;
  org: string | OneRosterOrg;
  subjectCodes: Record<string, unknown>;
  resources: Record<string, unknown>;
}

export interface OneRosterEnrollment {
  id: string;
  sourcedId: string;
  status: string;
  dateLastModified: "datetime";
  user: string | OneRosterUser;
  class: string | OneRosterClass;
  school: string | OneRosterOrg;
  role: string;
  primary: string;
  /** inclusive */
  beginDate: "datetime";
  /** exclusive */
  endDate: "datetime";
  metadata: string;
}

export interface OneRosterOrg {
  id: string;
  sourcedId: string;
  status: string;
  dateLastModified: "datetime";
  metadata: string;
  name: string;
  type: string;
  identifier: string;
  parent: Record<string, unknown>;
  children: Record<string, unknown>;
}

export interface OneRosterUser {
  id: string;
  sourcedId: string;
  status: string;
  dateLastModified: "datetime";
  metadata: string;
  username: string;
  userIds: Record<string, unknown>;
  enabledUser: string;
  givenName: string;
  familyName: string;
  middleName: string;
  role: string;
  identifier: string;
  email: string;
  sms: string;
  phone: string;
  agents: Record<string, unknown>;
  orgs: number[] | OneRosterUsersOrg[];
  grades: Record<string, unknown>;
  password: string;
}

export interface OneRosterUsersOrg {
  id: number;
  user_sourcedId: string | OneRosterUser;
  org_sourcedId: string | OneRosterOrg;
}

export interface Roster {
  id: string;
}

export interface SelQuestion {
  id: string;
  status: string;
  category: string;
  handle: string;
  question: string[] | SelQuestion[];
}

export interface TellMeAbout {
  id: string;
  status: string;
  handle: string;
  coverImage: string | DirectusFile;
  packName: Record<string, unknown>;
  questions: string[] | TellMeAboutQuestion[];
}

export interface TellMeAboutQuestionHint {
  id: string;
  audio: string | DirectusFile;
  text: string;
  language: string;
  foreignKey: string | TellMeAboutQuestion;
}

export interface TellMeAboutQuestionText {
  id: string;
  text: string;
  audio: string | DirectusFile;
  language: string;
  foreignKey: string | TellMeAboutQuestion;
}

export interface TellMeAboutQuestion {
  id: string;
  handle: string;
  hints: string[] | TellMeAboutQuestionHint[];
  texts: string[] | TellMeAboutQuestionText[];
  foreignKey: string | TellMeAbout;
}

export interface WouldDo {
  id: string;
  status: string;
  handle: string;
  packName: Record<string, unknown>;
  coverImage: string | DirectusFile;
  questions: string[] | WouldDoQuestion[];
}

export interface WouldDoQuestionHint {
  id: string;
  language: string;
  text: string;
  audio: string | DirectusFile;
  foreignKey: string | WouldDoQuestion;
}

export interface WouldDoQuestionText {
  id: string;
  language: string;
  text: string;
  audio: string | DirectusFile;
  foreignKey: string | WouldDoQuestion;
}

export interface WouldDoQuestion {
  id: string;
  handle: string;
  hints: string[] | WouldDoQuestionHint[];
  texts: string[] | WouldDoQuestionText[];
  foreignKey: string | WouldDo;
}

export interface DirectusFile {
  id: string;
  storage: string;
  filename_disk: string;
  filename_download: string;
  title: string;
  type: string;
  folder: string;
  uploaded_by: string;
  uploaded_on: string;
  modified_by: string;
  modified_on: string;
  charset: string;
  filesize: number;
  width: number;
  height: number;
  duration: number;
  embed: string;
  description: string;
  location: string;
  tags: string;
  metadata: string;
  created_on: string;
  focal_point_x: string;
  focal_point_y: string;
  tus_id: string;
  tus_data: string;
}

export interface DirectusUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  location: string;
  title: string;
  description: string;
  tags: string;
  avatar: string;
  language: string;
  tfa_secret: boolean;
  status: string;
  role: string;
  token: string;
  last_access: string;
  last_page: string;
  provider: string;
  external_identifier: string;
  auth_data: string;
  email_notifications: boolean;
  appearance: string;
  theme_dark: string;
  theme_light: string;
  theme_light_overrides: string;
  theme_dark_overrides: string;
  policies: string;
}

export interface DirectusFolder {
  id: string;
  name: string;
  parent: string;
}

export interface DirectusRole {
  id: string;
  name: string;
  icon: string;
  description: string;
  admin_access: boolean;
  app_access: boolean;
  children: string;
  users: string;
  parent: string;
  policies: string;
}

export interface ApiCollections {
  affirmationCardSides: AffirmationCardSide[];
  affirmationCards: AffirmationCard[];
  affirmations: Affirmation[];
  content: Content[];
  countWithMe: CountWithMe[];
  countWithMeAnimals: CountWithMeAnimal[];
  countWithMeCountingTexts: CountWithMeCountingText[];
  countWithMeFacts: CountWithMeFact[];
  countWithMeGroups: CountWithMeGroup[];
  countWithMeInstructions: CountWithMeInstruction[];
  dnd: Dnd[];
  dndInstructions: DndInstruction[];
  dndPieces: DndPiece[];
  dndPiecesJunction: DndPiecesJunction[];
  intruder: Intruder[];
  intruderWords: IntruderWord[];
  oneRoster: OneRoster[];
  oneRosterAcademicSessions: OneRosterAcademicSession[];
  oneRosterClasses: OneRosterClass[];
  oneRosterClassesAcademicSessions: OneRosterClassesAcademicSession[];
  oneRosterCourses: OneRosterCours[];
  oneRosterEnrollments: OneRosterEnrollment[];
  oneRosterOrgs: OneRosterOrg[];
  oneRosterUsers: OneRosterUser[];
  oneRosterUsersOrgs: OneRosterUsersOrg[];
  roster: Roster[];
  selQuestion: SelQuestion[];
  selQuestions: SelQuestion[];
  tellMeAbout: TellMeAbout[];
  tellMeAboutQuestionHints: TellMeAboutQuestionHint[];
  tellMeAboutQuestionTexts: TellMeAboutQuestionText[];
  tellMeAboutQuestions: TellMeAboutQuestion[];
  wouldDo: WouldDo[];
  wouldDoQuestionHints: WouldDoQuestionHint[];
  wouldDoQuestionTexts: WouldDoQuestionText[];
  wouldDoQuestions: WouldDoQuestion[];
  directus_files: DirectusFile[];
  directus_users: DirectusUser[];
  directus_folders: DirectusFolder[];
  directus_roles: DirectusRole[];
}
