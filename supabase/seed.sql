-- create test users
INSERT INTO
    auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) (
        select
            '00000000-0000-0000-0000-000000000000',
            uuid_generate_v4 (),
            'authenticated',
            'authenticated',
            'user' || (ROW_NUMBER() OVER ()) || '@example.com',
            crypt ('password123', gen_salt ('bf')),
            current_timestamp,
            NULL,
            current_timestamp,
            '{"provider":"email","providers":["email"]}',
            jsonb_build_object('first_name', 'FirstName' || (ROW_NUMBER() OVER ()), 'last_name', 'LastName' || (ROW_NUMBER() OVER ()), 'department', 'agent'),
            current_timestamp,
            current_timestamp,
            '',
            '',
            '',
            ''
        FROM
            generate_series(1, 10)
    );

-- test user email identities
INSERT INTO
    auth.identities (
        id,
        user_id,
        -- New column
        provider_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at
    ) (
        select
            uuid_generate_v4 (),
            id,
            -- New column
            id,
            format('{"sub":"%s","email":"%s"}', id :: text, email) :: jsonb,
            'email',
            current_timestamp,
            current_timestamp,
            current_timestamp
        from
            auth.users
    );


-- Insert mock data for hmo_providers
INSERT INTO hmo_providers (name) VALUES
('Provider A'),
('Provider B'),
('Provider C');

-- Insert mock data for plan_types
INSERT INTO plan_types (name) VALUES
('Basic Plan'),
('Premium Plan'),
('Family Plan');

-- Insert mock data for mode_of_payments
INSERT INTO mode_of_payments (name) VALUES
('Monthly'),
('Quarterly'),
('Annually');

-- Insert mock data for account_types
INSERT INTO account_types (name) VALUES
('Individual'),
('Corporate'),
('SME');

-- Insert mock data for mode_of_premium
INSERT INTO mode_of_premium (name) VALUES
('Fixed'),
('Variable'),
('Hybrid');


-- Insert additional mock data for accounts using a loop to generate 10 entries
DO $$
DECLARE
    agent_id uuid;
    hmo_provider_id uuid;
    account_type_id uuid;
    plan_type_id uuid;
    mode_of_payment_id uuid;
    mode_of_premium_id uuid;
BEGIN
    FOR i IN 1..10 LOOP
        -- Randomly select agent_id, hmo_provider_id, account_type_id, plan_type_id, mode_of_payment_id, mode_of_premium_id
        SELECT user_id INTO agent_id FROM user_profiles OFFSET floor(random() * (SELECT count(*) FROM user_profiles)) LIMIT 1;
        SELECT id INTO hmo_provider_id FROM hmo_providers OFFSET floor(random() * (SELECT count(*) FROM hmo_providers)) LIMIT 1;
        SELECT id INTO account_type_id FROM account_types OFFSET floor(random() * (SELECT count(*) FROM account_types)) LIMIT 1;
        SELECT id INTO plan_type_id FROM plan_types OFFSET floor(random() * (SELECT count(*) FROM plan_types)) LIMIT 1;
        SELECT id INTO mode_of_payment_id FROM mode_of_payments OFFSET floor(random() * (SELECT count(*) FROM mode_of_payments)) LIMIT 1;
        SELECT id INTO mode_of_premium_id FROM mode_of_premium OFFSET floor(random() * (SELECT count(*) FROM mode_of_premium)) LIMIT 1;

        INSERT INTO accounts (
            is_active,
            agent_id,
            company_name,
            company_address,
            nature_of_business,
            hmo_provider_id,
            previous_hmo_provider_id,
            current_hmo_provider_id,
            account_type_id,
            total_utilization,
            total_premium_paid,
            signatory_designation,
            contact_person,
            contact_number,
            principal_plan_type_id,
            dependent_plan_type_id,
            initial_head_count,
            effectivity_date,
            coc_issue_date,
            effective_date,
            renewal_date,
            expiration_date,
            delivery_date_of_membership_ids,
            orientation_date,
            initial_contract_value,
            mode_of_payment_id,
            wellness_lecture_date,
            annual_physical_examination_date,
            commision_rate,
            additional_benefits,
            special_benefits,
            mode_of_premium_id,
            due_date,
            or_number,
            or_date,
            sa_number,
            amount,
            total_contract_value,
            balance,
            billing_period,
            summary_of_benefits
        ) VALUES (
            true,
            agent_id,
            'Company ' || i,
            'Address ' || i,
            'Business ' || i,
            hmo_provider_id,
            hmo_provider_id,
            hmo_provider_id,
            account_type_id,
            1000 * i,
            2000 * i,
            'CEO',
            'Contact Person ' || i,
            '123-456-789' || i,
            plan_type_id,
            plan_type_id,
            50 * i,
            current_date,
            current_date,
            current_date,
            current_date + interval '1 year',
            current_date + interval '1 year',
            current_date + interval '1 month',
            current_date + interval '2 months',
            5000 * i,
            mode_of_payment_id,
            current_date + interval '3 months',
            current_date + interval '4 months',
            5.0,
            'Benefits ' || i,
            'Special Benefits ' || i,
            mode_of_premium_id,
            current_date + interval '1 year',
            'OR' || lpad(i::text, 6, '0'),
            current_date + interval '1 year',
            'SA' || lpad(i::text, 6, '0'),
            2000 * i,
            5000 * i,
            3000 * i,
            12,
            'Comprehensive health coverage'
        );
    END LOOP;
END $$;



