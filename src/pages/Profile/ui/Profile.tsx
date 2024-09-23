import { useGetMyProfileQuery } from '@/entities/User';
import { Error, Loader, LoaderJs } from '@/shared/ui';

const Profile = () => {
  const { data, error, isFetching } = useGetMyProfileQuery();

  if (isFetching) {
    return <Loader />;
  }

  if (!data) {
    return <Error error={error} />;
  }
  return (
    <div>
      <div>
        Hello
        {data.name}
        !!
      </div>
      page under development
      <LoaderJs />
    </div>
  );
};

export default Profile;
