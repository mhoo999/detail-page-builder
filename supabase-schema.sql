-- Supabase에서 실행할 SQL 스키마
-- Supabase Dashboard > SQL Editor에서 실행하세요

-- pages 테이블 생성
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- updated_at 자동 업데이트를 위한 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_at 트리거 생성
DROP TRIGGER IF EXISTS update_pages_updated_at ON pages;
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 인덱스 생성 (검색 성능 향상)
CREATE INDEX IF NOT EXISTS idx_pages_created_at ON pages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pages_title ON pages(title);

-- RLS (Row Level Security) 활성화
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기 가능
CREATE POLICY "Anyone can view pages"
  ON pages FOR SELECT
  USING (true);

-- 모든 사용자가 생성 가능
CREATE POLICY "Anyone can create pages"
  ON pages FOR INSERT
  WITH CHECK (true);

-- 모든 사용자가 수정 가능
CREATE POLICY "Anyone can update pages"
  ON pages FOR UPDATE
  USING (true);

-- 모든 사용자가 삭제 가능
CREATE POLICY "Anyone can delete pages"
  ON pages FOR DELETE
  USING (true);
