import BackHomeButton from "./back-home-button";
import SpotifyRedirectButton from "./spotify-redirect-button";

type PostGenerationActionsProps = {
    url: string;
}

const PostGenerationActions = (props: PostGenerationActionsProps) => {
    return (
        <div className="flex flex-col justify-center lg:space-y-10 space-y-5 mt-10 w-full">
            <SpotifyRedirectButton url={props.url} />
            <h6 className="lg:text-sm text-xs italic max-w-sm text-center">
                Or
            </h6>
            <BackHomeButton />
        </div>
    )
};

export default PostGenerationActions;