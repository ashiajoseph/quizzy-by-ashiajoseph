# frozen_string_literal: true

class RemoveIndexFromAttemptAnswer < ActiveRecord::Migration[6.1]
  def change
    remove_index :attempt_answers, column: :option_id
  end
end
