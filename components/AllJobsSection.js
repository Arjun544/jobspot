import React from "react";

const AllJobsSection = () => {
    // console.log(jobs);
  return (
    <div className="flex flex-col px-10 pt-4">
      <span>All jobs</span>
      {/* <span>{jobs?.length}</span> */}
    </div>
  );
};

// export async function getStaticProps(context) {
//   const jobs = await getAllJobs();
//   console.log(jobs);

//   return {
//     props: {
//       jobs: jobs,
//     },
//   };
// }

export default AllJobsSection;
