import { Button } from "@/components/ui/button";

export default function nada(){

    return(
        <main className="w-full h-full flex items-center justify-center">
            <div className="text-center flex flex-col gap-4">
                <h1 className="text-[90px] font-bold">404</h1>
                  <h1>Página não encontrada</h1>
                  <p>Clique em voltar!</p>
                <a href='/'><Button >voltar</Button></a> 
            </div>
        </main>       
    )
}