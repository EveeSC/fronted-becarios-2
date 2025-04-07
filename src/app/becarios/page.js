"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut, User, Activity, History } from "lucide-react";

export default function Becarios() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        {/* Sidebar personalizado */}
        <Sidebar 
          className="bg-[#253A69] text-white"
          variant="sidebar"
          collapsible="icon"
        >
          <SidebarHeader className="p-4 border-b border-[#3a4f7a]">
            <h2 className="text-xl font-semibold">Panel de Becarios</h2>
          </SidebarHeader>

          <SidebarContent className="flex-1 overflow-y-auto">
            <SidebarGroup>
              <SidebarMenu>
                {/* Mi Perfil */}
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={false}
                    className="hover:bg-[#3a4f7a]"
                  >
                    <User className="size-4" />
                    <span>Mi Perfil</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Actividades */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={false}
                    className="hover:bg-[#3a4f7a]"
                  >
                    <Activity className="size-4" />
                    <span>Actividades</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Historial de Actividades */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={false}
                    className="hover:bg-[#3a4f7a]"
                  >
                    <History className="size-4" />
                    <span>Historial de Actividades</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          {/* Pie del Sidebar con botón de cerrar sesión */}
          <SidebarFooter className="p-4 border-t border-[#3a4f7a]">
            <Button 
              variant="ghost" 
              className="w-full text-white hover:bg-[#3a4f7a] hover:text-white"
              onClick={() => {
                // Lógica para cerrar sesión
                console.log("Cerrando sesión...");
              }}
            >
              <LogOut className="mr-2 size-4" />
              <span>Cerrar Sesión</span>
            </Button>
          </SidebarFooter>
        </Sidebar>

        {/* Área de contenido principal */}
        <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Bienvenido al Panel de Becarios</h1>
          {/* Contenido principal de la página aquí */}
        </main>
      </div>
    </SidebarProvider>
  );
}