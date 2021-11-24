# frozen_string_literal: true

module Constants
  is_sqlite_db = ActiveRecord::Base.connection_db_config.configuration_hash[:adapter] == "sqlite3"
  DB_REGEX_OPERATOR = is_sqlite_db ? "REGEXP" : "~*"
  MAX_TITLE_LENGTH = 125
  MIN_PASSWORD_LENGTH = 6
  MAX_NAME_LENGTH = 50
end
