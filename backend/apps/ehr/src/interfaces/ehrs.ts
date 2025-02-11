export interface Ehr {
  id: string;
  name: string;
  description: string;
}

export interface Athena extends Ehr {
  type: 'athena';
  // TODO: Add more fields
}

export interface OtherScripts extends Ehr {
  type: 'other-scripts';
  // TODO: Add more fields
}
