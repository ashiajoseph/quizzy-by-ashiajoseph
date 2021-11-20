# frozen_string_literal: true

class RemoveOptionIdIdfromAttempt < ActiveRecord::Migration[6.1]
  def change
    remove_index :attempts, column: :option_id_id
    remove_column :attempts, :option_id_id
  end
end
