import { useQuery, useMutation } from "@apollo/client";
import {
  JOBS_QUERY,
  JOB_QUERY,
  COMPANY_QUERY,
  CREATE_JOB_MUTATION,
} from "../graphql/queries";
import { getAccessToken } from "../auth";

const useJobs = () => {
  const { data, loading, error } = useQuery(JOBS_QUERY, {
    fetchPolicy: "network-only",
  });
  return {
    jobs: data?.jobs,
    loading,
    error: Boolean(error),
  };
};

const useJob = (id) => {
  const { data, loading, error } = useQuery(JOB_QUERY, {
    variables: { id },
  });
  return {
    job: data?.job,
    loading,
    error: Boolean(error),
  };
};

const useCompany = (id) => {
  const { data, loading, error } = useQuery(COMPANY_QUERY, {
    variables: { id },
  });
  return {
    company: data?.company,
    loading,
    error: Boolean(error),
  };
};

const useCreateJob = () => {
  // useMutation won't call any API yet, API call happen when call mutate()
  const [mutate, { loading, error }] = useMutation(CREATE_JOB_MUTATION);

  const createJob = async (title, description) => {
    const {
      data: { job },
    } = await mutate({
      variables: { input: { title, description } },
      context: { headers: { Authorization: "Bearer " + getAccessToken() } },
      update: (cache, { data: { job } }) => {
        cache.writeQuery({
          query: JOB_QUERY,
          variables: { id: job.id },
          data: { job },
        });
      },
    });
    return job;
  };

  return {
    createJob,
    loading,
    error: Boolean(error),
  };
};

export { useJobs, useJob, useCompany, useCreateJob };
