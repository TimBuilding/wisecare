const importFields = [
  {
    // Visible in table header and when matching columns.
    label: 'Full Name',
    // This is the key used for this field when we call onSubmit.
    key: 'full_name',
    // Allows for better automatic column matching. Optional.
    alternateMatches: [
      'first name',
      'first',
      'member name',
      'member_name',
      'MEMBER NAME',
    ],
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: 'input',
    },
    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: 'Francisco, Monds',
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    label: 'First Name',
    key: 'first_name',
    alternateMatches: ['first name', 'first'],
    fieldType: {
      type: 'input',
    },
    example: 'Monds',
    validations: [
      {
        rule: 'required',
        errorMessage: 'First name is required',
        level: 'error',
      },
    ],
  },
  {
    label: 'Last Name',
    key: 'last_name',
    alternateMatches: ['last name', 'last'],
    fieldType: {
      type: 'input',
    },
    example: 'Francisco',
    validations: [
      {
        rule: 'required',
        errorMessage: 'Last name is required',
        level: 'error',
      },
    ],
  },
  {
    label: 'Birth Date',
    key: 'birth_date',
    alternateMatches: [
      'birth date',
      'birth',
      'dob',
      'date of birth',
      'birthdate',
      'birthday',
    ],
    fieldType: {
      type: 'input',
    },
    example: '1/25/1990',
    validations: [
      {
        rule: 'required',
        errorMessage: 'Birth date is required',
        level: 'error',
      },
    ],
  },
  {
    label: 'Gender',
    key: 'gender',
    alternateMatches: ['gender', 'sex', 'Gender', 'Sex'],
    fieldType: {
      type: 'select',
      options: [
        {
          label: 'Male',
          value: 'male',
          alternateMatches: ['male', 'm', 'MALE'],
        },
        {
          label: 'Female',
          value: 'female',
          alternateMatches: ['female', 'f', 'FEMALE'],
        },
      ],
    },
    example: 'male',
  },
  {
    label: 'Civil Status',
    key: 'civil_status',
    alternateMatches: ['civil status', 'civil', 'civil_status'],
    fieldType: {
      type: 'select',
      options: [
        {
          label: 'Single',
          value: 'single',
          alternateMatches: ['Single', 'single', 'SINGLE'],
        },
        {
          label: 'Married',
          value: 'married',
          alternateMatches: ['Married', 'married', 'MARRIED'],
        },
        {
          label: 'Divorced',
          value: 'divorced',
          alternateMatches: ['Divorced', 'divorced', 'divorce', 'DIVORCED'],
        },
        {
          label: 'Widowed',
          value: 'widowed',
          alternateMatches: ['Widowed', 'widowed', 'WIDOWED'],
        },
      ],
    },
    example: 'single',
  },
  {
    label: 'Card Number',
    key: 'card_number',
    alternateMatches: ['card number', 'card', 'card_number'],
    fieldType: {
      type: 'input',
    },
    example: '1234567890',
  },
  {
    label: 'Effective Date',
    key: 'effective_date',
    alternateMatches: ['effective date', 'effective', 'effective_date'],
    fieldType: {
      type: 'input',
    },
    example: '1/25/2024',
  },
  {
    label: 'Room Plan',
    key: 'room_plan',
    alternateMatches: [
      'room plan',
      'room',
      'room_plan',
      'Room Limit',
      'room limit',
      'room_limit',
    ],
    fieldType: {
      type: 'input',
    },
    example: '1/25/2024',
  },
  {
    label: 'Maximum Benefit Limit',
    key: 'maximum_benefit_limit',
    alternateMatches: [
      'maximum benefit limit',
      'maximum benefit',
      'maximum_benefit_limit',
      'MBL',
      'mbl',
    ],
    fieldType: {
      type: 'input',
    },
    example: 'MBL 10000',
  },
  {
    label: 'Member Type',
    key: 'member_type',
    alternateMatches: [
      'member type',
      'member',
      'member_type',
      'MEMBER TYPE',
      'member classification',
      'member_classification',
      'MEMBER CLASSIFICATION',
      'classification',
    ],
    fieldType: {
      type: 'select',
      options: [
        {
          label: 'Principal',
          value: 'principal',
          alternateMatches: ['principal', 'PRINCIPAL', 'P'],
        },
        {
          label: 'Dependent',
          value: 'dependent',
          alternateMatches: ['dependent', 'DEPENDENT', 'D'],
        },
      ],
    },
    example: 'principal',
  },
  {
    label: 'Dependent Relation',
    key: 'dependent_relation',
    alternateMatches: ['dependent relation', 'dependent', 'dependent_relation'],
    fieldType: {
      type: 'select',
      options: [
        {
          label: 'Spouse',
          value: 'spouse',
          alternateMatches: ['spouse', 'SPOUSE', 'S'],
        },
        {
          label: 'Child',
          value: 'child',
          alternateMatches: ['child', 'CHILD', 'C'],
        },
        {
          label: 'Parent',
          value: 'parent',
          alternateMatches: ['parent', 'PARENT', 'P'],
        },
      ],
    },
    example: 'spouse',
  },
  {
    label: 'Expiration Date',
    key: 'expiration_date',
    alternateMatches: ['expiration date', 'expiration', 'expiration_date'],
    fieldType: {
      type: 'input',
    },
    example: '1/25/2024',
  },
]

export default importFields
