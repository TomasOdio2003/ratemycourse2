-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "title" TEXT,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grade" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "term" TEXT NOT NULL,
    "instructor" TEXT,
    "a" INTEGER NOT NULL DEFAULT 0,
    "b" INTEGER NOT NULL DEFAULT 0,
    "c" INTEGER NOT NULL DEFAULT 0,
    "d" INTEGER NOT NULL DEFAULT 0,
    "f" INTEGER NOT NULL DEFAULT 0,
    "w" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_subject_number_key" ON "Course"("subject", "number");

-- CreateIndex
CREATE UNIQUE INDEX "Grade_courseId_term_key" ON "Grade"("courseId", "term");

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
