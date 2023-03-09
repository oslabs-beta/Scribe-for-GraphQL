-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(25) NOT NULL,
    "last_name" VARCHAR(25) NOT NULL,
    "username" VARCHAR(25) NOT NULL,
    "email" VARCHAR(25) NOT NULL,
    "password" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tests" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "generated_test" VARCHAR(50000) NOT NULL,

    CONSTRAINT "tests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
