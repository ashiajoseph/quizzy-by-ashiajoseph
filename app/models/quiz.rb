# frozen_string_literal: true

class Quiz < ApplicationRecord
  belongs_to :user
  validates :title, presence: true, length: { maximum: 125 }
end
