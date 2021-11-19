# frozen_string_literal: true

class RemoveOptionIdFromAttempt < ActiveRecord::Migration[6.1]
  def change
    remove_reference :attempts, :option_id_id, index: true
  end
end
