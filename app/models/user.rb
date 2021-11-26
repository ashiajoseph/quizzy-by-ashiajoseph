# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze

  has_many :quizzes
  has_many :attempts, dependent: :destroy

  has_secure_password
  has_secure_token :authentication_token

  enum role: { standard: "standard", administrator: "administrator" }
  validates :first_name, presence: true, length: { maximum: Constants::MAX_NAME_LENGTH }
  validates :last_name, presence: true, length: { maximum: Constants::MAX_NAME_LENGTH }
  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  validates :password, length: { minimum: Constants::MIN_PASSWORD_LENGTH }, if: -> { password.present? }
  validates :password_confirmation, presence: true, on: :create

  before_validation :to_lowercase

  private

    def to_lowercase
      email.downcase!
    end
end
