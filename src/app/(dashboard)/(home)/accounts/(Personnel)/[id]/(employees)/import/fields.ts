const importFields = [
  {
    // Visible in table header and when matching columns.
    label: 'Name',
    // This is the key used for this field when we call onSubmit.
    key: 'name',
    // Allows for better automatic column matching. Optional.
    alternateMatches: ['first name', 'first'],
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: 'input',
    },
    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: 'Stephanie',
    // Can have multiple validations that are visible in Validation Step table.
    validations: [
      {
        // Can be "required" / "unique" / "regex"
        rule: 'required',
        errorMessage: 'Name is required',
        // There can be "info" / "warning" / "error" levels. Optional. Default "error".
        level: 'error',
      },
    ],
  },
  {
    label: 'First Name',
    key: 'first_name',
    alternateMatches: ['first name', 'first'],
    fieldType: {
      type: 'input',
    },
    example: 'Troy',
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
    example: 'Baker',
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
    alternateMatches: ['gender'],
    fieldType: {
      type: 'select',
      options: [
        {
          label: 'Male',
          value: 'male',
          alternateMatches: ['male', 'm'],
        },
        {
          label: 'Female',
          value: 'female',
          alternateMatches: ['female', 'f'],
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
          alternateMatches: ['Single', 'single'],
        },
        {
          label: 'Married',
          value: 'married',
          alternateMatches: ['Married', 'married'],
        },
        {
          label: 'Divorced',
          value: 'divorced',
          alternateMatches: ['Divorced', 'divorced', 'divorce'],
        },
        {
          label: 'Widowed',
          value: 'widowed',
          alternateMatches: ['Widowed', 'widowed'],
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
    alternateMatches: ['room plan', 'room', 'room_plan'],
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
]

export default importFields
