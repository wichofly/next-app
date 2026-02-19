interface PhotoPageProps {
  params: Promise<{ id: number; photoId: number }>;
}

const PhotoPage = async ({ params }: PhotoPageProps) => {
  const { id, photoId } = await params;

  return (
    <div>PhotoPage: {id} - {photoId}</div>
  )
}

export default PhotoPage