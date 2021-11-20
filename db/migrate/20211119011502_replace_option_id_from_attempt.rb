# frozen_string_literal: true

class ReplaceOptionIdFromAttempt < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :attempt_answers, column: :option_id
  end
end
