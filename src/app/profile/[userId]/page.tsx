export default async function UserProfile({params}: any ) {

    console.log(params);
        <div className="flex flex-col items-center justify-center">
            <h1>PROFILE PAGE</h1>
            <p>{params.userId}</p>
        </div>
}