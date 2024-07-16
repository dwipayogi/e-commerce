import Sidebar from "@/components/setting/Sidebar";

export default function Setting({ children }) {
  return (
    <div className="container my-12">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 my-4">
        Setting
      </h2>
      <div className="flex">
        <Sidebar className="basis-1/4" />
        <main className="basis-3/4">
          {children}
        </main>
      </div>
    </div>
  );
}
