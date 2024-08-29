ALTER TABLE accounts
ADD COLUMN name_of_signatory TEXT NOT NULL,
ADD COLUMN designation_of_contact_person TEXT NOT NULL,
ADD COLUMN email_address_of_contact_person TEXT NOT NULL;

ALTER TABLE accounts
DROP COLUMN effective_date,
DROP COLUMN renewal_date;