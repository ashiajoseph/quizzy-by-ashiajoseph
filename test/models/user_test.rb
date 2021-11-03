# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome")
  end

  def test_user_should_be_valid
    assert @user.valid?
  end

  def test_user_should_not_be_valid_and_saved_without_first_name
    @user.first_name = ""
    assert_not @user.valid?
    assert_equal ["First name can't be blank"], @user.errors.full_messages
  end

  def test_user_should_not_be_valid_and_saved_without_last_name
    @user.last_name = ""
    assert_not @user.valid?
    assert_equal ["Last name can't be blank"], @user.errors.full_messages
  end

  def test_user_should_not_be_valid_and_saved_without_email
    @user.email = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Email can't be blank", "Email is invalid"
  end

  def test_first_name_should_be_of_valid_length
    @user.first_name = "a" * 51
    assert_not @user.valid?
  end

  def test_last_name_should_be_of_valid_length
    @user.last_name = "a" * 51
    assert_not @user.valid?
  end

  def test_email_should_be_unique_for_each_user
    @user.save!
    user2 = @user.dup
    assert_not user2.valid?
    assert_includes user2.errors.full_messages, "Email has already been taken"
  end

  def test_email_should_be_saved_as_lowecase
    email_upcased = @user.email.upcase
    @user.update!(email: email_upcased)
    assert_equal @user.email, email_upcased.downcase
  end

  def test_validation_should_accept_valid_email_addresses
    valid_emails = %w[user@example.com first_last@example.com USER@EXAMPLE.com first.last@example.com
user+one@example.ac.in]

    valid_emails.each do |email|
      @user.email = email
      assert @user.valid?
    end
  end

  def test_validation_should_reject_invalid_email_addresses
    invalid_emails = %w[userexample.com first_last@example,com @EXAMPLE.com first@example+ac.com user+one@example. ]

    invalid_emails.each do |email|
      @user.email = email
      assert_not @user.valid?
    end
  end

  def test_multiple_users_with_same_email_should_not_be_saved_irrespective_of_case
    user2 = @user.dup
    user2.email = "SAM@EXAMPLE.COM"
    user2.save!
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Email has already been taken"
  end

  def test_user_should_have_valid_role
    assert_equal @user.role, "standard"
    assert @user.valid?
    @user.role = "administrator"
    assert @user.save!
  end

  def test_error_raised_when_user_with_invalid_role_is_created
    assert_raises ArgumentError do
      @user.role = "manager"
    end
  end

  def test_user_should_not_be_saved_without_password
    @user.password = nil
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Password can't be blank"
  end

  def test_user_should_not_be_saved_without_password_confirmation
    @user.password_confirmation = nil
    assert_not @user.save
    assert_includes @user.errors.full_messages, "Password confirmation can't be blank"
  end

  def test_password_should_be_of_valid_length
    @user.password = "abcde"
    assert_not @user.save
    assert_includes @user.errors.full_messages, "Password is too short (minimum is 6 characters)"
  end

  def test_user_should_have_matching_password_and_password_confirmation
    @user.password_confirmation = "#{@user.password}-12345"
    assert_not @user.save
    assert_includes @user.errors.full_messages, "Password confirmation doesn't match Password"
  end
end
