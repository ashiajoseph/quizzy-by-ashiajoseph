# frozen_string_literal: true

class AddAnswerCountToAttempts < ActiveRecord::Migration[6.1]
  def change
    add_column :attempts, :correct_answers_count, :integer, null: false, default: 0
    add_column :attempts, :incorrect_answers_count, :integer, null: false, default: 0
  end
end
