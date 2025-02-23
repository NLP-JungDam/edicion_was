import Job from "../models/jobschema.js";
import User from "../models/userschema.js"

// 사업자등록번호로 채용 공고 조회
export async function getJobsByBusinessNumber(businessNumber) {
  return await Job.find({ businessNumber }).populate("applicants"); 
}

// 채용 공고에 지원한 사용자 조회
export async function getApplicantsByBusinessNumber(businessNumber) {
  const jobs = await Job.find({ businessNumber }).populate("applicants");

  if (!jobs.length) {
    throw new Error("해당 사업자의 채용 공고가 없습니다.");
  }

  let allApplicants = [];
  jobs.forEach(job => {
    allApplicants = [...allApplicants, ...job.applicants];
  });

  return allApplicants;
}

// 인재상 유형으로 유저 조회
export const findUsersByTalentedType = async (talentedType) => {
  try {
    return await User.find({ talentedType })
      .select("name birth phone.number email jobObjective license history talentedType")
      .lean();
  } catch (error) {
    console.error("데이터베이스 조회 오류:", error);
    throw error;
  }
};
