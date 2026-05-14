from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()

# Dummy hash 
DUMMY_HASH = password_hash.hash("bolitasdemar")