# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy
  has_many :attempt_answers, dependent: :destroy
  validates :question, presence: true
  accepts_nested_attributes_for :options, allow_destroy: true
  validate :check_options_count, :check_answer

  def check_options_count
    unless options.length >= 2 && options.length <= 4
      errors.add(:options, "count should be between 2 and 4")
    end
  end

  def check_answer
    selected = options.select { |option| option.answer == true }
    unless selected.size == 1
      errors.add(:options, ": Only one option must be correct")
    end
  end
end
