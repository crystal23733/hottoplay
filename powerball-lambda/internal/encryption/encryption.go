package encryption

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"errors"
	"io"
	"os"
)

var encryptionKey []byte

// EncryptedResponse는 암호화된 응답을 나타냅니다
type EncryptedResponse struct {
	IsEncrypted bool   `json:"isEncrypted"`
	Data        string `json:"data"`
}

// Initialize는 환경변수에서 암호화 키를 로드합니다
func Initialize() error {
	key := os.Getenv("API_ENCRYPTION_KEY")
	if key == "" {
		return errors.New("암호화 키가 설정되지 않았습니다")
	}

	// 32바이트 키로 패딩 (AES-256)
	encryptionKey = make([]byte, 32)
	copy(encryptionKey, []byte(key))

	return nil
}

// EncryptResponse는 데이터를 암호화하고 EncryptedResponse 형식으로 반환합니다
func EncryptResponse(data []byte) ([]byte, error) {
	encryptedData, err := Encrypt(data)
	if err != nil {
		return nil, err
	}

	// Base64 인코딩
	encodedStr := base64.StdEncoding.EncodeToString(encryptedData)

	// 암호화된 응답 객체 생성
	response := EncryptedResponse{
		IsEncrypted: true,
		Data:        encodedStr,
	}

	return json.Marshal(response)
}

// Encrypt는 데이터를 AES-CBC로 암호화합니다 (CryptoJS와 호환)
func Encrypt(data []byte) ([]byte, error) {
	// AES 블록 생성
	block, err := aes.NewCipher(encryptionKey)
	if err != nil {
		return nil, err
	}

	// CBC 모드를 위한 IV 생성 (16 바이트)
	iv := make([]byte, aes.BlockSize)
	if _, err := io.ReadFull(rand.Reader, iv); err != nil {
		return nil, err
	}

	// PKCS7 패딩 추가
	paddedData := addPKCS7Padding(data, aes.BlockSize)

	// 암호화
	mode := cipher.NewCBCEncrypter(block, iv)
	ciphertext := make([]byte, len(paddedData))
	mode.CryptBlocks(ciphertext, paddedData)

	// IV + 암호문 결합
	result := make([]byte, len(iv)+len(ciphertext))
	copy(result, iv)
	copy(result[len(iv):], ciphertext)

	return result, nil
}

// PKCS7 패딩 추가
func addPKCS7Padding(data []byte, blockSize int) []byte {
	padding := blockSize - (len(data) % blockSize)
	padtext := make([]byte, padding)
	for i := range padtext {
		padtext[i] = byte(padding)
	}
	return append(data, padtext...)
}
