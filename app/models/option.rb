# frozen_string_literal: true

class Option < ApplicationRecord
  belongs_to :question
  has_many :attempt_answers
  validates :content, presence: true
end
