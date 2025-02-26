package generator

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGenerateRandom(t *testing.T) {
	g := NewGenerator(nil) // 랜덤 생성에는 과거 데이터가 필요 없음

	// 여러 번 테스트 실행
	for i := 0; i < 100; i++ {
		numbers := g.GenerateRandom()

		// 1. 흰 공 개수 확인
		assert.Len(t, numbers.WhiteNumbers, 5, "흰 공은 정확히 5개여야 합니다")

		// 2. 흰 공 범위 확인
		for _, num := range numbers.WhiteNumbers {
			assert.GreaterOrEqual(t, num, 1, "흰 공 번호는 1 이상이어야 합니다")
			assert.LessOrEqual(t, num, 69, "흰 공 번호는 69 이하여야 합니다")
		}

		// 3. 흰 공 중복 확인
		numMap := make(map[int]bool)
		for _, num := range numbers.WhiteNumbers {
			assert.False(t, numMap[num], "흰 공 번호는 중복되면 안 됩니다")
			numMap[num] = true
		}

		// 4. 흰 공 정렬 확인
		for i := 0; i < len(numbers.WhiteNumbers)-1; i++ {
			assert.Less(t,
				numbers.WhiteNumbers[i],
				numbers.WhiteNumbers[i+1],
				"흰 공 번호는 오름차순으로 정렬되어야 합니다",
			)
		}

		// 5. 파워볼 범위 확인
		assert.GreaterOrEqual(t, numbers.Powerball, 1, "파워볼 번호는 1 이상이어야 합니다")
		assert.LessOrEqual(t, numbers.Powerball, 26, "파워볼 번호는 26 이하여야 합니다")
	}
}
