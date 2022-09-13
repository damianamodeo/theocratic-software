import { useLiveQuery } from "dexie-react-hooks";
import { idb } from "../../services/idb/idb";
import { importStores } from "../../services/idb/importStores";
import { FileInput } from "../../../common/components/inputs/file";
import { Button } from "../../../common/components/inputs/button";

export const List = () => {
  const searchString = "";
  const publishers = useLiveQuery(async () => {
    const publishers = await idb.publishers
      .orderBy("[lastName+firstName]")
      .filter((publisher) => {
        let str = `${publisher.firstName} ${publisher.lastName} ${publisher.middleName} ${publisher.otherName}`;
        return str.match(searchString);
      })
      .toArray();
    return publishers;
  }, [searchString]);

  return (
    <>
      <FileInput
        id="import-stores"
        helpText="select .ord or .csv file"
        fileTypes=""
      ></FileInput>
      <Button
        action={() => {
          importStores("publishers");
        }}
      >
        Import
      </Button>
      {publishers?.map((publisher) => (
        <div
          key={publisher.id}
          // action={() => {
          //   publisherDetails(publisher);
          // }}
        >
          <div className="py-2">
            <div>
              {publisher.lastName}, {publisher.firstName}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
