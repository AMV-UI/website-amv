import Footer from "@components/footer/Footer";
import HeaderTeam from "@components/header/team/HeaderTeam";
import SectionMember from "@components/section/member/SectionMember";
import SectionOlderMember from "@components/section/member/SectionOlderMember";
import { readData } from "@utils/jsonify";

const Team = ({ divisions, olderMembers }) => {
  return (
    <>
      <HeaderTeam divisions={divisions} />
      <div>
        {divisions.map((data) => (
          <SectionMember key={data.name} division={data} />
        ))}
        {olderMembers && olderMembers.length > 0 && (
          <SectionOlderMember olderMembers={olderMembers} />
        )}
      </div>
      <Footer />
    </>
  );
};

export async function getStaticProps() {
  const membersData = readData("member/currentMember.json");
  const divisionsData = readData("divisions.json");
  let olderMembers = [];
  try {
    olderMembers = Object.values(readData("member/oldMember.json"));
  } catch {
    olderMembers = [];
  }

  const divisions = Object.entries(divisionsData).map(([_, item]) => {
    item.members = [];
    for (const [key, value] of Object.entries(membersData)) {
      if (key.split("_")[0] == item.code) {
        item.members.push(value);
      }
    }
    return item;
  });

  return {
    props: {
      divisions: divisions,
      olderMembers: olderMembers,
    },
  };
}

export default Team;