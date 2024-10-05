import TopNav from "../../../../components/home/topNav";
import GroupPage from "../../../../sections/nhom-dich/GroupPage";
import { Group } from "@/api";

export default async function ({ params }: { params: { groupId: string } }) {

    return (
        <>
            <TopNav />
            <GroupPage />
        </>
    )
}