interface PhotoPageProps {
  params: { id: number; photoId: number };
}

const PhotoPage = ({ params }: PhotoPageProps) => {
  const { id, photoId } = params;

  return (
    <div>PhotoPage: {id} - {photoId}</div>
  )
}

export default PhotoPage