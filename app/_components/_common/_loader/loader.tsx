export const Loader = () => {
    return (
        //position:fixed css style added so that loading animation can cover screen when screen is more than 100vh
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    )
}