import SideNav from "../components/Sidebar";

export default function () {
    return <main className=" h-[100vh] flex flex-row">
        <SideNav />
        <div className="h-full  w-3/4"></div>
    </main>
}