# frozen_string_literal: true

class AttemptAnswer < ApplicationRecord
  belongs_to :attempt
  belongs_to :question
  belongs_to :option
end
