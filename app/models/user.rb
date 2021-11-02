# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze
  has_secure_password

  enum role: { standard: "standard", administrator: "administrator" }
  validates :first_name, presence: true, length: { maximum: 50 }
  validates :last_name, presence: true, length: { maximum: 50 }
  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }

  before_save :to_lowercase

  private

    def to_lowercase
      email.downcase!
    end
end
