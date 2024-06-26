CREATE OR REPLACE FUNCTION notify_all_finance_users_new_account()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notifications (user_id, title, description)
  SELECT user_id, 'New Account Created', 'A new account has been created ' || NEW.id || '.'
  FROM user_profiles
  WHERE department_id = (SELECT id FROM departments WHERE name = 'finance');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_new_account_notification
AFTER INSERT ON accounts
FOR EACH ROW
EXECUTE PROCEDURE notify_all_finance_users_new_account();