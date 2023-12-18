export default function App({ env }) {

    return (
        <>
            <div>{env === 'prod' ? 'PRODDDDD ENVIRONMENT' : 'DEV ENVIRONMENT'}</div>
        </>
    );
}